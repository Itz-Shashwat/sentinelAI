import React from "react";
import ShashwatImage from "./assets/shashwat.png";
import ved from "./assets/veda.jpg"
import hershe from "./assets/harshii.jpg"
import kav from "./assets/kavya.jpg"

// CSS in JS for dark theme and flexbox layout
const styles = {
  container: {
    backgroundColor: "#1e1e2f",
    color: "#e4e4e7",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection: "column", // Stacks the sections vertically
    gap: "20px", // Adds spacing between sections
  },
  section: {
    width: "500px", // Set the width of each section to 500px
    padding: "20px",
    backgroundColor: "#27293d",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
    opacity: 0.9,
    display: "flex",
    alignItems: "flex-start", // Aligns contents of each section to the top
    gap: "20px",
  },
  image: {
    borderRadius: "50%",
    width: "100px",
    height: "100px",
    objectFit: "cover",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // Align contents of details to the left
    textAlign: "left", // Align text to the left
    gap: "10px", // Adds spacing between elements for better readability
    color: "#e4e4e7",
  },
  name: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  info: {
    marginBottom: "3px",
    fontSize: "14px",
  },
  links: {
    display: "flex",
    justifyContent: "flex-start", // Align links to the left
    gap: "10px",
  },
  link: {
    color: "#38bdf8",
    textDecoration: "none",
  },
  header: {
    color: "#e4e4e7",
    textAlign: "center",  // This aligns the text to the center
    margin: "0 auto",  // Ensure the header takes up full width and centers within container
    marginBottom: "20px", // Space below the header
    marginTop: "30px",
    fontSize:"30px",
    textTransform:"uppercase", // Space above the header
  },
};

function Team() {
  const teamMembers = [
    {
      name: "Shashwat Sharma",
      role: "Software Developer",
      rollNo: "HU21CSEN0100730",
      email: "shashwatsharmammiii@gmail.com",
      linkedin: "https://www.linkedin.com/in/shashwat-sharma1712/",
      github: "https://github.com/Itz-Shashwat",
      website: "https://shashwatprasad66.wixsite.com/knowmore",
      image: ShashwatImage,
    },
    {
        name: "Veda Sree Chalasani",
        role: "UI Developer ",
        rollNo: "HU21CSEN0100737",
        email: "vedasree0812@gmail.com",
        linkedin: " https://www.linkedin.com/in/vedasree812",
        github: " https://github.com/Veda-Sree",
        website: "https://shashwatprasad66.wixsite.com/knowmore",
        image: ved,
      },
      {
        name: "Agastya Harshini Sai",
        role: "UI Developer ",
        rollNo: "HU21CSEN0101155",
        email: "harshinisai.agastya@gmail.com",
        linkedin: "https://linkedin.com/in/harshiniagastya",
        github: "https://github.com/harshini2408",
        website: "https://shashwatprasad66.wixsite.com/knowmore",
        image: hershe,
      },
      {
        name: "Kavya Kothapalli",
        role: "UI Developer ",
        rollNo: "HU21CSEN0101371",
        email: "kavyakothapa2002@gmail.com",
        linkedin: " https://in.linkedin.com/in/kavyakothapallii",
        github: " https://github.com/kavyakothapallii",
        website: "https://shashwatprasad66.wixsite.com/knowmore",
        image: kav,
      },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Contributors</h1> {/* Header now centered */}
      {teamMembers.map((member, index) => (
        <div style={styles.section} key={index}>
          <img src={member.image} alt={member.name} style={styles.image} />
          <div style={styles.details}>
            <div style={styles.name}>{member.name}</div>
            <div style={styles.info}>{member.role}</div>
            <div style={styles.info}>Roll No: {member.rollNo}</div>
            <div style={styles.info}>Email: {member.email}</div>
            <div style={styles.links}>
              <a href={member.linkedin} target="_blank" rel="noreferrer" style={styles.link}>
                LinkedIn
              </a>
              <a href={member.github} target="_blank" rel="noreferrer" style={styles.link}>
                GitHub
              </a>
              <a href={member.website} target="_blank" rel="noreferrer" style={styles.link}>
                Website
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Team;
