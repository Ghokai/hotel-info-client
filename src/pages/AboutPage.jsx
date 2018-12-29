import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Greetings from Hotelify:)</h1>
      <p className="lead">
        This applications validates, visualizes, uploads and converts to various
        formats of given csv files which are consists of hotel informations like
        name, address, rating, contact, phone, uri
      </p>
      <hr className="my-4" />
      <p>
        it is just a job interview programming assigment which is coded by Gökay
        Arpacı (gokayarpaci@gmail.com)
      </p>

      <p>
        You can find both of frontend (React & Redux) SPA app and backend
        (Asp.Net Core 2.0) applications source codes on my github account:
        <span> </span>
        <a
          href="https://github.com/ghokai"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/ghokai
        </a>
      </p>
      <Link className="btn btn-primary btn-lg" to="/" role="button">
        Navigate to Upload Page
      </Link>
    </div>
  );
}
