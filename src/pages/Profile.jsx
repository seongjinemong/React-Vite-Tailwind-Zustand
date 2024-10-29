import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../lib/store";
import { useEffect, useState } from "react";
import customAaxios from "../lib/axios";

import Divider from "../components/Divider";

export default function Profile() {
  const credentials = useAuthStore((state) => state.credentials);
  var info;

  if (credentials) info = jwtDecode(credentials.credential);

  const [profile, setProfile] = useState(null);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      if (credentials) {
        const res = await customAaxios.get("/user/profile", {
          withCredentials: true,
        });
        setProfile(res.data);
        setSummary(res.data.summary);
      }
    }
    fetchProfile();
  }, [credentials]);

  async function updateSummary() {
    try {
      const res = await customAaxios.post("/user/summary", { summary });
      setProfile(res.data);
    } catch (error) {
      console.error("Failed to update summary:", error);
    }
  }

  return (
    <>
      <div className="w-full flex flex-col items-center gap-4">
        <div
          onClick={() => (window.location.href = "/")}
        >{`< back to main`}</div>
        <div>Profile Page</div>
        {info ? (
          <>
            <img className="w-40 h-40" src={info.picture} alt="Profile" />
            <div className="text-xl font-bold">{`${info.name}`}</div>
            <div>{`${info.email}`}</div>
          </>
        ) : (
          <div>Not Logged In</div>
        )}

        {profile ? <div>{`${JSON.stringify(profile)}`}</div> : <></>}

        <Divider />

        <div className="flex flex-col gap-2">
          <div>Update Summary</div>
          <input
            className="p-3 rounded-lg"
            placeholder="Summary"
            value={summary}
            type="text"
            onChange={(e) => setSummary(e.target.value)}
          />
          <button onClick={updateSummary}>Update</button>
        </div>
      </div>
    </>
  );
}
