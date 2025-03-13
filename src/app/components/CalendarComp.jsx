// src/app/components/CalendarComp.jsx
"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUser } from "@/contexts/UserContext";

export function CalendarComp({ schedule, setSchedule }) {
  const { user, error } = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [selectedCounterparty, setSelectedCounterparty] = useState("");
  const [counterparties, setCounterparties] = useState([]);

  useEffect(() => {
    // Once user data is loaded, set counterparties based on role.
    if (user) {
      if (user.role === "tutor") {
        setCounterparties(user.students || []);
      } else if (user.role === "student") {
        setCounterparties(user.teachers || []);
      }
    }
  }, [user]);

  const handleScheduleClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      user.role === "tutor" ? "/api/scheduleLesson" : "/api/requestLesson";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          counterpartyId: selectedCounterparty,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSchedule((prev) => [...prev, data.lesson]);
        setShowForm(false);
      } else {
        console.error("Failed to schedule lesson", data.error);
      }
    } catch (err) {
      console.error("Error scheduling lesson:", err);
    }
  };

  return (
    <div className="p-6 w-1/2 mx-2 rounded-md border shadow flex flex-col items-center">
      {error && <p className="text-red-600">{error}</p>}
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => setSelectedDate(date)}
        className="my-2"
      />
      <p>Selected Date: {selectedDate.toUTCString()}</p>
      {user && (
        <Button className="hover:cursor-pointer mt-3" onClick={handleScheduleClick}>
          {user.role === "tutor" ? "Schedule Lesson" : "Request Lesson"}
        </Button>
      )}
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="mt-4 w-full rounded-md border p-4 shadow"
        >
          <Label htmlFor="counterparty" className="mb-2 block">
            {user && user.role === "tutor"
              ? "Select Student:"
              : "Select Tutor:"}
          </Label>
          <select
            id="counterparty"
            name="counterparty"
            value={selectedCounterparty}
            onChange={(e) => setSelectedCounterparty(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
            required
          >
            <option value="">-- Select --</option>
            {counterparties.map((cp) => (
              <option key={cp.id || cp._id} value={cp.id || cp._id}>
                {cp.email}
              </option>
            ))}
          </select>
          <Button type="submit" className="mt-4">
            Confirm {user && user.role === "tutor" ? "Schedule" : "Request"} Lesson
          </Button>
        </form>
      )}
    </div>
  );
}
