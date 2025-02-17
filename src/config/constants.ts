export const InterviewStatusConst = [
  "PENDING",
  "FINISHED",
  "NO-SHOW",
  "REJECTED",
  "SELECTED",
  "HOLD",
] as const;

export const scheduleLabelConst = {
  candidateEmail: "Email",
  candidateContactNum: "Contact",
  candidateFirstName: "First Name",
  candidateLastName: "Last Name",
  startDateTime: "Start Date",
  endDateTime: "End Date",
  interviewStatus: "Status",
};
