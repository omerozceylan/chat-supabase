import { MainContext } from "@/MainContext";
import { useContext } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { supabase } from "@/supabase/client";

export default function CreateRoomButton() {
  const { user, getRooms, setActiveTabId } = useContext(MainContext);

  async function addRoom(roomName) {
    const { data, error } = await supabase
      .from("rooms")
      .insert([{ room_name: roomName }])
      .select();
    const idOfTheCreatedRoom = data[0].id;
    relationUserToRoom(idOfTheCreatedRoom);
  }

  async function relationUserToRoom(roomId) {
    const { data, error } = await supabase
      .from("participants")
      .insert([{ room_id: roomId, user_id: user.id, is_invite_accepted: true }])
      .select();

    getRooms(user);
    setActiveTabId(data[0].id);
  }

  if (!user) return <div></div>;

  return (
    <div>
      {" "}
      <div></div>
      <FiPlusSquare
        onClick={() => {
          const userName =
            user.app_metadata.provider === "google"
              ? user.user_metadata.full_name
              : user.user_metadata.username;

          addRoom(`${userName}'s room`);
        }}
        className="cursor-pointer"
      />
    </div>
  );
}
