const toFullName = (v: {
  lastName?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  [key: string]: any;
}) => `${v.lastName ?? ""} ${v.firstName ?? ""} ${v.middleName ?? ""}`;

export default toFullName;
