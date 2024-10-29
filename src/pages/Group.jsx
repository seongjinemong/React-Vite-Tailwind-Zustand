import { useState, useEffect } from "react";
import customAaxios from "../lib/axios";
import Divider from "../components/Divider";
import { toast } from "react-toastify";

export default function Group() {
  const [group_list, setGroupList] = useState([]);
  const [group_id, setGroupId] = useState("");
  const [group, setGroup] = useState({});

  const [group_name, setGroupName] = useState("");
  const [group_user_ids, setGroupUserIds] = useState("");

  const [user_ids, setUserIds] = useState("");

  async function getGroupList() {
    try {
      const res = await customAaxios.get("/group");
      setGroupList(res.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  useEffect(() => {
    getGroupList();
  }, []);

  async function getGroupbyGroupId(group_id) {
    try {
      const res = await customAaxios.get(`/group/${group_id}`);
      setGroup(res.data);
      await getGroupList();
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  async function createGroup(group_name, group_user_ids) {
    try {
      const res = await customAaxios.post("/group/new", {
        name: group_name,
        user_ids: group_user_ids,
      });

      setGroup(res.data);
      await getGroupList();
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  async function addUserToGroup(group_id, user_ids) {
    try {
      const res = await customAaxios.post(`/group/${group_id}/addfriend`, {
        user_ids: user_ids,
      });

      setGroup(res.data);
      await getGroupList();
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  async function removeUserFromGroup(group_id, user_ids) {
    try {
      const res = await customAaxios.post(`/group/${group_id}/removefriend`, {
        user_ids: user_ids,
      });

      setGroup(res.data);
      await getGroupList();
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  async function deleteGroup(group_id) {
    try {
      await customAaxios.delete(`/group/${group_id}`);
      setGroup({});
      await getGroupList();
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="font-bold text-xl">Timetable API</div>
      <div className="flex flex-col">
        <div>Group List</div>
        <div>{JSON.stringify(group_list)}</div>
      </div>

      <Divider />

      <div className="flex flex-col gap-2">
        <div>Get Group with GroupId</div>
        <input
          className="p-3 rounded-lg"
          placeholder="GroupId"
          value={group_id}
          type="text"
          onChange={(e) => setGroupId(e.target.value)}
        />
        <button onClick={() => getGroupbyGroupId(group_id)}>Get</button>
        <div>{JSON.stringify(group)}</div>
      </div>

      <Divider />

      <div className="flex flex-col gap-2">
        <div>Create Grouop</div>
        <input
          className="p-3 rounded-lg"
          placeholder="Name"
          value={group_name}
          type="text"
          onChange={(e) => setGroupName(e.target.value)}
        />

        <input
          className="p-3 rounded-lg"
          placeholder="UserIds ex)5,7"
          value={group_user_ids}
          type="text"
          onChange={(e) => setGroupUserIds(e.target.value)}
        />
        <button onClick={() => createGroup(group_name, group_user_ids)}>
          Create
        </button>
        <div>{JSON.stringify(group)}</div>
      </div>

      <Divider />

      <div className="flex flex-col gap-2">
        <div>Add / Remove User to / from Group</div>
        <input
          className="p-3 rounded-lg"
          placeholder="GroupId"
          value={group_id}
          type="text"
          onChange={(e) => setGroupId(e.target.value)}
        />
        <input
          className="p-3 rounded-lg"
          placeholder="UserIds ex)5,7"
          value={user_ids}
          type="text"
          onChange={(e) => setUserIds(e.target.value)}
        />

        <div className="flex flex-row w-full gap-2">
          <button
            className="flex-1"
            onClick={() => addUserToGroup(group_id, user_ids)}
          >
            Add
          </button>
          <button
            className="flex-1"
            onClick={() => removeUserFromGroup(group_id, user_ids)}
          >
            Remove
          </button>
        </div>

        <div>{JSON.stringify(group)}</div>
      </div>

      <Divider />

      <div className="flex flex-col gap-2">
        <div>Delete Group</div>
        <input
          className="p-3 rounded-lg"
          placeholder="GroupId"
          value={group_id}
          type="text"
          onChange={(e) => setGroupId(e.target.value)}
        />

        <button onClick={() => deleteGroup(group_id)}>Delete</button>
      </div>
    </div>
  );
}
