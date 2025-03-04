import React from "react";
import {
  FaMoneyBillWave,
  FaSignInAlt,
  FaList,
  FaChartPie,
  FaQuoteLeft,
} from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)", // Updated gradient
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Pattern Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "url('https://www.transparenttextures.com/patterns/always-grey.png')", // Subtle pattern
            opacity: "0.1",
            zIndex: 1,
          }}
        ></div>

        <div className="container-fluid text-center position-relative" style={{ zIndex: 2 }}>
          {/* Heading */}
          <h1
            className="display-4 font-weight-bold mb-4"
            style={{
              color: "#ffffff",
              fontFamily: "'Poppins', sans-serif", // Modern font
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Text shadow
            }}
          >
            Track Your Expenses Effortlessly
          </h1>

          {/* Subheading */}
          <p
            className="lead mb-5"
            style={{
              color: "#e0e0e0",
              fontFamily: "'Poppins', sans-serif", // Modern font
            }}
          >
            Manage your finances with a modern solution designed for you.
          </p>

          {/* Feature Cards */}
          <div className="row justify-content-center gap-4 mb-5">
            <div className="col-md-3">
              <div
                className="card bg-white p-4 shadow-lg hover-shadow"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
                }}
              >
                <FaMoneyBillWave className="h3 mb-3 mx-auto text-primary" />
                <h3 className="h5 font-weight-bold">Efficient Tracking</h3>
                <p>Track your expenses seamlessly.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="card bg-white p-4 shadow-lg hover-shadow"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
                }}
              >
                <FaFilter className="h3 mb-3 mx-auto text-success" />
                <h3 className="h5 font-weight-bold">Transactions Filtering</h3>
                <p>Filter and organize your transactions.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="card bg-white p-4 shadow-lg hover-shadow"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
                }}
              >
                <IoIosStats className="h3 mb-3 mx-auto text-warning" />
                <h3 className="h5 font-weight-bold">Insightful Reports</h3>
                <p>Get detailed financial insights.</p>
              </div>
            </div>
          </div>

          {/* Call to Action Button */}
          <Link
            to="/login"
            className="btn btn-light btn-lg text-dark shadow"
            style={{
              backgroundColor: "#ffffff",
              border: "none",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-5 bg-light">
        <div className="container-fluid text-center">
          <h2
            className="h1 font-weight-bold mb-5"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            How It Works
          </h2>
          <div className="row justify-content-center gap-4">
            {/* Step 1 */}
            <div className="col-md-3">
              <div
                className="card bg-white p-4 shadow-lg hover-shadow"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
                }}
              >
                <div className="p-3 bg-primary rounded-circle d-inline-block mb-3">
                  <FaSignInAlt className="h3 text-white" />
                </div>
                <h3 className="h5 font-weight-bold">Sign Up</h3>
                <p>Register and start managing your expenses in a minute.</p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="col-md-3">
              <div
                className="card bg-white p-4 shadow-lg hover-shadow"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
                }}
              >
                <div className="p-3 bg-success rounded-circle d-inline-block mb-3">
                  <FaList className="h3 text-white" />
                </div>
                <h3 className="h5 font-weight-bold">Add Transactions</h3>
                <p>Quickly add income and expenses to your account.</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="col-md-3">
              <div
                className="card bg-white p-4 shadow-lg hover-shadow"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
                }}
              >
                <div className="p-3 bg-warning rounded-circle d-inline-block mb-3">
                  <FaChartPie className="h3 text-white" />
                </div>
                <h3 className="h5 font-weight-bold">View Reports</h3>
                <p>See insightful reports & graphs of your finances.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-5">
        <div className="container-fluid text-center">
          <h2
            className="h1 font-weight-bold mb-5"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            What Our Users Say
          </h2>
          <div className="row justify-content-center gap-4">
            <div className="col-md-5">
              <div
                className="card bg-white p-4 shadow-lg hover-shadow"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
                }}
              >
                <FaQuoteLeft className="h3 text-muted mb-3" />
                <p className="mb-4">
                  "This app has revolutionized the way I track my expenses.
                  Highly intuitive and user-friendly."
                </p>
                <p className="font-weight-bold">- yashika bhatia</p>
              </div>
            </div>
            <div className="col-md-5">
              <div
                className="card bg-white p-4 shadow-lg hover-shadow"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
                }}
              >
                <FaQuoteLeft className="h3 text-muted mb-3" />
                <p className="mb-4">
                  "Finally, a hassle-free way to manage my finances. The insights
                  feature is a game changer!"
                </p>
                <p className="font-weight-bold">- shivani negi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)", // Updated gradient
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Pattern Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "url('https://www.transparenttextures.com/patterns/always-grey.png')", // Subtle pattern
            opacity: "0.1",
            zIndex: 1,
          }}
        ></div>

        <div className="container-fluid text-center position-relative" style={{ zIndex: 2 }}>
          <h2
            className="h1 font-weight-bold mb-4"
            style={{
              color: "#ffffff",
              fontFamily: "'Poppins', sans-serif", // Modern font
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Text shadow
            }}
          >
            Ready to Take Control of Your Finances?
          </h2>
          <p
            className="lead mb-5"
            style={{
              color: "#e0e0e0",
              fontFamily: "'Poppins', sans-serif", // Modern font
            }}
          >
            Join us now and start managing your expenses like a pro!
          </p>
          <Link
            to="/signup"
            className="btn btn-light btn-lg text-dark shadow"
            style={{
              backgroundColor: "#ffffff",
              border: "none",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            Sign Up For Free
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;