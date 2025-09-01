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
  const { id } = useParams();
  const [person, setPerson] = useState<Person>();
  const [personCredits, setPersonCredits] = useState<Movie[] | null>([]);

  const [personLoading, setPersonLoading] = useState(true);
  const [personCreditsLoading, setPersonCreditsLoading] = useState(true);
  const loading = personLoading || personCreditsLoading;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonInfo = async () => {
      try {
        setPersonLoading(true);

        const res = await axios.get(`${URL}person/${id}`);
        const json = res.data;

        if (json.data) {
          setPerson(json.data);
          document.title = `${json.data.name} | MovieBoxd`;
        } else {
          navigate("*");
        }
        setPersonLoading(false);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch person info");
        showToast("error", "Failed to fetch person info");
        setPersonLoading(true);
      }
    };

    const fetchPersonCreditsInfo = async () => {
      try {
        setPersonCreditsLoading(true);

        const res = await axios.get(`${URL}person/${id}/credits`);
        const json = res.data;

        if (json.data) {
          setPersonCredits(json.data);
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
  }, [id]);

  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      <Navbar />

      {/* toaster */}
      <AppToaster />

      {loading ? (
        <PersonLoading key={id} />
      ) : person ? (
        <PersonInfo key={id} person={person} person_credits={personCredits} />
      ) : null}
    </div>
  );
}
