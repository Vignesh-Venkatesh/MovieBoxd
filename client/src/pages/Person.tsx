import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AppToaster from "../components/misc/Toaster";
import { showToast } from "../lib/showToast";
import PersonLoading from "../components/loading/PersonLoading";
import PersonInfo from "../components/person/PersonInfo";

import type { Movie, Person } from "../lib/types";
import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function Person() {
  const { id } = useParams(); // get person ID from URL
  const [person, setPerson] = useState<Person>(); // store person info
  const [personCredits, setPersonCredits] = useState<Movie[] | null>([]); // store person's movies

  // loading states
  const [personLoading, setPersonLoading] = useState(true);
  const [personCreditsLoading, setPersonCreditsLoading] = useState(true);
  const loading = personLoading || personCreditsLoading; // overall loading state

  const navigate = useNavigate(); // for navigation on errors or invalid IDs

  useEffect(() => {
    // fetch basic person info
    const fetchPersonInfo = async () => {
      try {
        setPersonLoading(true);

        const res = await axios.get(`${URL}person/${id}`);
        const json = res.data;

        if (json.data) {
          setPerson(json.data);
          document.title = `${json.data.name} | MovieBoxd`; // update page title
        } else {
          navigate("*"); // navigate to 404 if person not found
        }
        setPersonLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch person info");
        showToast("error", "Failed to fetch person info");
        setPersonLoading(true);
      }
    };

    // fetch person's movie credits
    const fetchPersonCreditsInfo = async () => {
      try {
        setPersonCreditsLoading(true);

        const res = await axios.get(`${URL}person/${id}/credits`);
        const json = res.data;

        if (json.data) {
          setPersonCredits(json.data); // set the credits
        }
        setPersonCreditsLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch person credits info");
        showToast("error", "Failed to fetch person credits info");
        setPersonCreditsLoading(true);
      }
    };

    fetchPersonInfo();
    fetchPersonCreditsInfo();
  }, [id]); // refetch if URL ID changes

  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      <Navbar />

      {/* toaster for notifications */}
      <AppToaster />

      {loading ? (
        // show loading skeleton while fetching data
        <PersonLoading key={id} />
      ) : person ? (
        // show person info and credits once loaded
        <PersonInfo key={id} person={person} person_credits={personCredits} />
      ) : null}
    </div>
  );
}
