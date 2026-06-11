-- The Premier Fireplace Suite tour video was replaced
-- (Grand---Fireplace-Suite-King-standard-and-handicap.mp4 →
-- Grand-Hotel---Premier-King-Fireplace.mp4). Point both suite rooms at the
-- new tour; their cover is its first frame per the covers convention
-- (set in 20260611043000_grand_room_covers_from_tour_frames.sql).
update public.rooms
  set video_url = 'https://cdn.myhotelops.com/cg-hotel-group/grand-hotel/Grand-Hotel---Premier-King-Fireplace.mp4'
  where hotel_id = 'grand' and code in ('FP', 'HS');
