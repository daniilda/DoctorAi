const toFullName = (v: {
  lastName?: string;
  firstName?: string;
  middleName?: string;
  [key: string]: any;
}) => `${v.lastName ?? ""} ${v.firstName ?? ""} ${v.middleName ?? ""}`;

export default toFullName;
