exports.enumArray = {
  status: {
    value: ["ACTIVE", "INACTIVE", "PENDING", "FINISHED", "BLOCKED"],
    default: "ACTIVE",
  },
  role: {
    value: ["ADMIN", "USER", "OWNER", "SUPPORT", "MANAGER"],
    default: "USER",
  },
  orientation: {
    value: ["LANDSCAPE", "PORTRAIT"],
    default: "LANDSCAPE",
  },
  content: {
    value: ["IMAGE", "WEB", "DOCUMENT", "VIDEO"],
    default: "IMAGE",
  },
};
