"use client";

import React from "react";
import { format } from "date-fns";
import Html from "react-pdf-html";
import { ICv } from "@/lib/interfaces";
import { htmlCustomStyle } from "@/data/html-style";
import { Text, View, StyleSheet, Document, Page } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Times-Roman",
  },
  section: {},
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textDecorationStyle: "solid",
    fontFamily: "Times-Bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 13,
    fontWeight: "bold",
    borderBottom: "1px solid #000",
    fontFamily: "Times-Bold",
    paddingBottom: 2,
    textTransform: "uppercase",
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Times-Bold",
    textDecorationStyle: "solid",
  },
  text: {
    marginBottom: 2,
    color: "#414040",
  },
  listItem: {
    fontSize: 11,
    color: "#414040",
  },
});

interface Props {
  cv: ICv | undefined;
}

export default function PreviewCv2({ cv }: Props) {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          padding: 20,
          fontSize: 10,
          fontFamily: "Times-Roman",
        }}
      >
        {/* Header */}
        <View style={styles.section}>
          <Text style={styles.header}>{cv?.fullName}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.sectionHeader}>Mobile : </Text>
              <Text
                style={{
                  fontSize: 9,
                  color: "#414040",
                }}
              >
                {cv?.phoneNumber}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.sectionHeader}>Email : </Text>
              <Text
                style={{
                  fontSize: 9,
                  color: "#414040",
                }}
              >
                {cv?.email}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.sectionHeader}>LinkedIn : </Text>
              <Text
                style={{
                  fontSize: 9,
                  color: "#414040",
                }}
              >
                {cv?.linkedInURL}
              </Text>
            </View>
          </View>
          <Text style={{ textAlign: "center", fontSize: 10, marginTop: 5 }}>
            {cv?.address}
          </Text>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>PERSONAL PROFILE</Text>
          <Html stylesheet={htmlCustomStyle}>{cv?.summary || ""}</Html>
        </View>

        {/* skills */}
        {cv?.skills.length !== 0 && <SkillsSection skills={cv?.skills} />}

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>EXPERIENCE & CAREER HISTORY</Text>
          {cv?.experience.length !== 0 &&
            cv?.experience.map((exp, index) => (
              <View key={index} style={{ marginVertical: 5 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={styles.sectionHeader}>
                      {format(new Date(exp.startDate), "MMMM yyyy")} -{" "}
                      {!exp.current
                        ? format(new Date(exp.endDate), "MMMM yyyy")
                        : "Present"}
                    </Text>
                  </View>
                  <Text style={styles.sectionHeader}>{exp.position}</Text>
                  <Text style={styles.sectionHeader}>{exp.company}</Text>
                </View>
                <View>
                  {exp?.description && (
                    <Text
                      style={{
                        fontSize: 12,
                        fontStyle: "italic",
                        color: "#414040",
                        fontFamily: "Times-Italic",
                      }}
                    >
                      Description:{" "}
                    </Text>
                  )}
                  <Html stylesheet={htmlCustomStyle}>
                    {exp?.description || ""}
                  </Html>
                </View>
              </View>
            ))}

          {/* PROJECTS */}
          {cv?.project.length !== 0 &&
            cv?.project.map((project, index) => (
              <View key={index} style={{ marginBottom: 5 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={styles.sectionHeader}>
                      {format(new Date(project.startDate), "MMMM yyyy")} -{" "}
                      {!project.current
                        ? format(new Date(project.endDate), "MMMM yyyy")
                        : "Present"}
                    </Text>
                  </View>
                  <Text style={styles.sectionHeader}>{project.position}</Text>
                  <Text style={styles.sectionHeader}>{project.name}</Text>
                </View>
                <View>
                  <View>
                    {project?.description && (
                      <Text
                        style={{
                          fontSize: 12,
                          fontStyle: "italic",
                          color: "#414040",
                          fontFamily: "Times-Italic",
                        }}
                      >
                        Description:{" "}
                      </Text>
                    )}
                    <Html stylesheet={htmlCustomStyle}>
                      {project?.description || ""}
                    </Html>
                  </View>
                </View>
              </View>
            ))}
        </View>

        {/* Education */}
        {cv?.education.length !== 0 && (
          <View style={[styles.section, { marginBottom: 10 }]}>
            <Text style={styles.subHeader}>EDUCATIONS</Text>
            {cv?.education.map((edu, index) => (
              <View key={index} style={{ marginVertical: 5 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={styles.sectionHeader}>{edu.degree}</Text>
                    <Text style={styles.text}>{edu.university}</Text>
                  </View>
                  <View>
                    <Text style={styles.sectionHeader}>
                      {format(new Date(edu.startDate), "MMMM yyyy")} -{" "}
                      {!edu.current
                        ? format(new Date(edu.endDate), "MMMM yyyy")
                        : "Present"}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Certifications, Languages */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Certifications & Languages</Text>
          {/* CERTIFICATIONS */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                fontFamily: "Times-Bold",
              }}
            >
              Certifications:{" "}
            </Text>
            {cv?.certifications.map((certificate, index) => (
              <Text key={index} style={styles.listItem}>
                {certificate.name} ({certificate.score}){" "}
                {index === cv?.certifications.length - 1 ? "" : ","}
              </Text>
            ))}
          </View>

          {/* LANGUAGES */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                fontFamily: "Times-Bold",
              }}
            >
              Languages:{" "}
            </Text>
            {cv?.languages.map((lang, index) => (
              <Text key={index} style={styles.listItem}>
                {lang.name} ({lang.proficiency}){" "}
                {index === cv?.languages.length - 1 ? "" : ","}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

const MAX_COLUMNS = 4;
const MAX_ROWS = 5;

const splitIntoColumns = (
  skills: string[],
  maxColumns: number,
  maxRows: number
) => {
  const limitedSkills = skills.slice(0, maxColumns * maxRows);

  const columns = [];
  for (let i = 0; i < limitedSkills.length; i += maxRows) {
    columns.push(limitedSkills.slice(i, i + maxRows));
  }

  return columns;
};

const SkillsSection = ({ skills }: { skills: string[] | undefined }) => {
  if (!skills || skills.length === 0) return null;

  const skillColumns = splitIntoColumns(skills, MAX_COLUMNS, MAX_ROWS);

  return (
    <View>
      <Text style={styles.subHeader}>Skills Summary</Text>
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        {skillColumns.map((column, colIndex) => (
          <View
            key={colIndex}
            style={{
              flex: 1,
              marginHorizontal: 5,
              marginTop: 5,
            }}
          >
            {column.map((skill: string, rowIndex: number) => (
              <Text
                key={rowIndex}
                style={{
                  fontSize: 11,
                  marginBottom: 3,
                }}
              >
                • {skill}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};
