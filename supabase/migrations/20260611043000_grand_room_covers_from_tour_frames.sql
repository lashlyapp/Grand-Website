-- Align Grand room covers with their tour videos. Several rooms used generic
-- stock photos (room-0X.jpg) that didn't match the room's own tour, so the
-- card thumbnail showed a different room than the video. Each cover is now the
-- FIRST frame of that room's tour video — committed on the grand site as
-- /images/rooms/frame-*.jpg — so the thumbnail is exactly what the tour shows
-- when it starts playing. Regenerate with `ffmpeg -i tour.mp4 -frames:v 1` if
-- a video changes. (Cupertino already uses per-video stills; no change there.)

update public.rooms set cover_image_url = '/images/rooms/frame-deluxe-king.jpg'
  where hotel_id = 'grand' and code in ('DK', 'SK');

update public.rooms set cover_image_url = '/images/rooms/frame-deluxe-room.jpg'
  where hotel_id = 'grand' and code in ('DQ', 'SQ', 'QH');

update public.rooms set cover_image_url = '/images/rooms/frame-villa-king.jpg'
  where hotel_id = 'grand' and code in ('VK', 'PK', 'VH');

update public.rooms set cover_image_url = '/images/rooms/frame-villa-queen.jpg'
  where hotel_id = 'grand' and code in ('VQ', 'PQ');

update public.rooms set cover_image_url = '/images/rooms/frame-premier-king-fireplace.jpg'
  where hotel_id = 'grand' and code in ('FP', 'HS');
