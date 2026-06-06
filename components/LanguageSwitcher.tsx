"use client";

import { useEffect, useState } from "react";

// In-page language switcher powered by Google's client-side website translate
// widget. We keep Google's actual gadget hidden and drive it with the
// `googtrans` cookie (set cookie + reload), exposing our own curated dropdown
// instead. This keeps visitors on our domain rather than sending them to a
// separate translated site.
const LANGS = [
  { code: "en", label: "English" },
  { code: "zh-CN", label: "中文" },
  { code: "es", label: "Español" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "fr", label: "Français" },
] as const;

const INCLUDED = LANGS.map((l) => l.code).join(",");

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
    __gtPatched?: boolean;
  }
}

// Google Translate rewrites text nodes; React can then throw on removeChild /
// insertBefore when it updates those same nodes. This well-known, contained
// guard turns such already-detached operations into no-ops. Applied once.
function patchDomForGoogleTranslate() {
  if (typeof window === "undefined" || window.__gtPatched) return;
  window.__gtPatched = true;
  const origRemove = Node.prototype.removeChild;
  Node.prototype.removeChild = function (this: Node, child: any) {
    if (child.parentNode !== this) return child;
    return origRemove.call(this, child);
  } as typeof Node.prototype.removeChild;
  const origInsert = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (this: Node, newNode: any, refNode: any) {
    if (refNode && refNode.parentNode !== this) return newNode;
    return origInsert.call(this, newNode, refNode);
  } as typeof Node.prototype.insertBefore;
}

function readCurrentLang(): string {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "en";
}

function setGoogtransCookie(value: string, clear = false) {
  const host = window.location.hostname;
  const bare = host.replace(/^www\./, "");
  const suffix = clear ? "; expires=Thu, 01 Jan 1970 00:00:00 GMT" : "";
  const v = clear ? "" : value;
  // Set across path/domain variants so it sticks on localhost and prod.
  document.cookie = `googtrans=${v}; path=/${suffix}`;
  document.cookie = `googtrans=${v}; path=/; domain=${host}${suffix}`;
  document.cookie = `googtrans=${v}; path=/; domain=.${bare}${suffix}`;
}

export default function LanguageSwitcher() {
  const [current, setCurrent] = useState("en");

  useEffect(() => {
    patchDomForGoogleTranslate();
    setCurrent(readCurrentLang());

    // The widget reads the googtrans cookie on init and applies translation.
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: INCLUDED, autoDisplay: false },
        "google_translate_element",
      );
    };

    const id = "google-translate-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      document.body.appendChild(s);
    } else if (window.google?.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  function changeLanguage(code: string) {
    if (code === current) return;
    if (code === "en") {
      setGoogtransCookie("", true); // clear → original
    } else {
      setGoogtransCookie(`/en/${code}`);
    }
    window.location.reload();
  }

  return (
    <>
      <div id="google_translate_element" className="hidden" aria-hidden="true" />
      <select
        aria-label="Select language"
        translate="no"
        className="notranslate cursor-pointer rounded border border-white/30 bg-ink/40 px-2 py-1.5 text-sm font-medium text-white/85 outline-none transition-colors hover:border-gold hover:text-gold focus:border-gold"
        value={current}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code} className="bg-white text-ink">
            {l.label}
          </option>
        ))}
      </select>
    </>
  );
}
