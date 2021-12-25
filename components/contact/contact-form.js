import React, { useEffect, useRef, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

const sendContactData = async (msg) => {
  const res = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify({ ...msg }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
};

export default function ContactForm() {
  const emailInput = useRef();
  const nameInput = useRef();
  const messageInput = useRef();
  const [requestStatus, setRequestStatus] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessageHandler = async (event) => {
    event.preventDefault();

    const msg = {
      email: emailInput.current.value,
      name: nameInput.current.value,
      message: messageInput.current.value,
    };
    setRequestStatus("pending");

    try {
      await sendContactData(msg);
      setRequestStatus("success");
      emailInput.current.value = "";
      nameInput.current.value = "";
      messageInput.current.value = "";
    } catch (error) {
      setError(error.message);
      setRequestStatus("error");
    }
  };

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "peniding",
      title: "sending message...",
      message: "Your message is being sent...",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Your message has been sent successfully!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "Error",
      title: "Error!",
      message: error || "Something went wrong",
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" required id="email" ref={emailInput} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" required id="name" ref={nameInput} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            required
            rows="5"
            ref={messageInput}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && <Notification {...notification} />}
    </section>
  );
}
