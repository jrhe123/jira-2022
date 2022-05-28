import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>Project screen</h1>
      <Link to={"kanban"}>Detail</Link>
      <Link to={"epic"}>Tasks</Link>
      <Routes>
        {/* projects/:projectId/kanban */}
        <Route path="/kanban" element={<KanbanScreen />} />
        {/* projects/:projectId/epic */}
        <Route path="/epic" element={<EpicScreen />} />
        <Route
          path="*"
          element={
            <Navigate
              to={window.location.pathname + "/kanban"}
              replace={true}
            />
          }
        />
      </Routes>
    </div>
  );
};
