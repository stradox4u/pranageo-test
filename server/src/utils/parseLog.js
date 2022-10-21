exports.formatLogs = (logs) => {
  const formattedLogs = logs.map((log) => {
    const splitted = log.split(" ");
    const hash = log.split(" ")[0];
    splitted.shift();
    const msg = splitted.join(" ");
    return {
      commitHash: hash,
      commitMessage: msg,
    }
  });

  return formattedLogs
}