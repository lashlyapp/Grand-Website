-- Align Grand room covers with their tour videos. Several rooms used generic
-- stock photos (room-0X.jpg) that didn't match the room's own tour, so the
-- card thumbnail showed a different room than the video. Each cover is now a
-- frame extracted from that room's actual tour video — committed on the grand
-- site as /images/rooms/frame-*.jpg — so the preview always matches the tour.
-- (Cupertino already uses per-video stills; no change needed there.)

update public.rooms set cover_image_url = '/images/rooms/frame-deluxe-king.jpg'
  where hotel_id = 'grand' and code in ('DK', 'SK');

update public.rooms set cover_image_url = '/images/rooms/frame-deluxe-room.jpg'
  where hotel_id = 'grand' and code in ('DQ', 'SQ', 'QH');

update public.rooms set cover_image_url = '/images/rooms/frame-villa-king.jpg'
  where hotel_id = 'grand' and code in ('VK', 'PK', 'VH');

update public.rooms set cover_image_url = '/images/rooms/frame-villa-queen.jpg'
  where hotel_id = 'grand' and code in ('VQ', 'PQ');

update public.rooms set cover_image_url = '/images/rooms/frame-fireplace-suite.jpg'
  where hotel_id = 'grand' and code in ('FP', 'HS');
