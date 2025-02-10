"use client";

import React from "react";
import { Text, View, StyleSheet, Document, Page } from "@react-pdf/renderer";
import Html from "react-pdf-html";
import { ICv } from "@/lib/interfaces";
import { format } from "date-fns";
import { htmlCustomStyle } from "@/data/html-style";
import { CvValues } from "@/lib/types";

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
  cv: ICv | CvValues | undefined;
}

export default function PreviewCv({ cv }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
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
            <Text
              style={{
                fontSize: 9,
                fontWeight: "bold",
              }}
            >
              {cv?.phoneNumber} |
            </Text>

            <Text
              style={{
                fontSize: 9,
                fontWeight: "bold",
              }}
            >
              {cv?.email} |
            </Text>
            <Text
              style={{
                fontSize: 9,
                fontWeight: "bold",
              }}
            >
              {cv?.linkedInURL} |
            </Text>
            <Text
              style={{
                fontSize: 9,
                fontWeight: "bold",
              }}
            >
              {cv?.portfolioURL}
            </Text>
          </View>
          <Text style={{ textAlign: "center", fontSize: 10, marginTop: 5 }}>
            {cv?.address}
          </Text>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>ABOUT ME</Text>
          <Html stylesheet={htmlCustomStyle}>{cv?.summary || ""}</Html>
        </View>

        {/* Experience */}
        {cv?.experiences.length !== 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>WORK EXPERIENCE</Text>
            {cv?.experiences.map((exp, index) => (
              <View key={index} style={{ marginVertical: 5 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={styles.sectionHeader}>{exp.position}</Text>
                    <Text style={styles.sectionHeader}>{exp.company}</Text>
                  </View>
                  <View>
                    <Text style={styles.sectionHeader}>
                      {format(new Date(exp.startDate), "MMMM yyyy")} -{" "}
                      {!exp.current
                        ? format(new Date(exp?.endDate || ""), "MMMM yyyy")
                        : "Present"}
                    </Text>
                  </View>
                </View>
                <View>
                  <Html stylesheet={htmlCustomStyle}>
                    {exp?.description || ""}
                  </Html>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Project */}
        {cv?.projects.length !== 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>PROJECT EXPERIENCES</Text>
            {cv?.projects.map((project, index) => (
              <View key={index} style={{ marginVertical: 5 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={styles.sectionHeader}>{project.name}</Text>
                    <Text style={styles.sectionHeader}>{project.position}</Text>
                  </View>
                  <View>
                    <Text style={styles.sectionHeader}>
                      {format(new Date(project.startDate), "MMMM yyyy")} -{" "}
                      {!project.current
                        ? format(new Date(project?.endDate || ""), "MMMM yyyy")
                        : "Present"}
                    </Text>
                  </View>
                </View>
                <View>
                  <Html stylesheet={htmlCustomStyle}>
                    {project?.description || ""}
                  </Html>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {cv?.educations.length !== 0 && (
          <View style={[styles.section, { marginBottom: 10 }]}>
            <Text style={styles.subHeader}>EDUCATIONS</Text>
            {cv?.educations.map((edu, index) => (
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
                        ? format(new Date(edu?.endDate || ""), "MMMM yyyy")
                        : "Present"}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {cv?.certifications && cv?.certifications.length !== 0 && (
          <View style={[styles.section, { marginBottom: 10 }]}>
            <Text style={styles.subHeader}>CERTIFICATIONS</Text>
            {cv?.certifications.map((certificate, index) => (
              <View key={index} style={{ marginVertical: 5 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={styles.sectionHeader}>{certificate.name}</Text>
                    <Text style={styles.text}>
                      {certificate.institution}, ({certificate.score})
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.sectionHeader}>
                      {format(new Date(certificate.year), "MMMM yyyy")}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>SKILLS</Text>
          {/* OTHER */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              Other:{" "}
            </Text>
            <Text style={styles.listItem}>{cv?.skills.join(", ")},</Text>
          </View>

          {/* LANGUAGES */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              Languages:{" "}
            </Text>
            {cv?.languages?.map((lang, index) => (
              <Text key={index} style={styles.listItem}>
                {lang.name} ({lang.proficiency}){" "}
                {index === (cv?.languages?.length || 0) - 1 ? "" : ","}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
