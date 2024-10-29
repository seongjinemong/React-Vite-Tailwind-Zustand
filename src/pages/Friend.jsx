import { useState, useEffect } from "react";
import customAaxios from "../lib/axios";

// 토스트 알림 띄우기 위해 쓰는 라이브러리
import { toast } from "react-toastify";

import Divider from "../components/Divider";

export default function Friend() {
  const [freinds, setFreinds] = useState([]);
  const [email_add, setEmailAdd] = useState("");
  const [email_remove, setEmailRemove] = useState("");
  const [friend_id, setFriendId] = useState("");
  const [friend_profile, setFriendProfile] = useState({});

  const addFriend = async (email) => {
    try {
      const response = await customAaxios.post("/friend/add", {
        email,
      });
      toast.success("Friend Added");
      setFreinds(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const removeFriend = async (email) => {
    try {
      const response = await customAaxios.post("/friend/remove", {
        email,
      });

      toast.success("Friend Removed");
      setFreinds(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const getFriendProfile = async (friend_id) => {
    try {
      const response = await customAaxios.get(`/user/profile/${friend_id}`);
      setFriendProfile(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    async function getFriend() {
      try {
        const response = await customAaxios.get("/friend/");
        setFreinds(response.data);
      } catch (error) {
        console.error("Failed to fetch friends:", error);
        setFreinds([]); // Set to empty array on error
      }
    }
    getFriend();
  }, []);

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="font-bold text-xl">Friend API</div>
      <div className="flex flex-col">
        <div>List of Friends</div>
        <ul>
          {freinds.map((friend) => (
            <li key={friend}>{JSON.stringify(friend)}</li>
          ))}
        </ul>
      </div>

      <Divider />

      <div className="flex flex-col gap-2">
        <div>Add Friend</div>
        <input
          className="p-3 rounded-lg"
          placeholder="Email"
          type="text"
          onChange={(e) => setEmailAdd(e.target.value)}
        />
        <button onClick={() => addFriend(email_add)}>Add</button>
      </div>

      <Divider />

      <div className="flex flex-col gap-2">
        <div>Remove Friend</div>
        <input
          className="p-3 rounded-lg"
          placeholder="Email"
          type="text"
          onChange={(e) => setEmailRemove(e.target.value)}
        />
        <button onClick={() => removeFriend(email_remove)}>Remove</button>
      </div>

      <Divider />

      <div className="flex flex-col gap-2">
        <div>Friend&apos;s Profile</div>
        <input
          className="p-3 rounded-lg"
          placeholder="Email"
          type="text"
          onChange={(e) => setFriendId(e.target.value)}
        />
        <button onClick={() => getFriendProfile(friend_id)}>Get</button>
        <div>{JSON.stringify(friend_profile)}</div>
      </div>
    </div>
  );
}
