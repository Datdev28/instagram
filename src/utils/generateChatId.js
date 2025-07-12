export const generateChatId = (userA, userB) => {
  return [userA, userB].sort().join("_");
};
