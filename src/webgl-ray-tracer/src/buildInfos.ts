

const buildDate = "<buildDate-not-specified>";
const currDate = new Date();

const _getHumanTimeDiff = (refData: Date, currDate: Date): string => {

  const refTimeMs = refData.getTime();
  const currTimeMs = currDate.getTime();
  const deltaTimeMs = currTimeMs - refTimeMs;

  // less than 1sec
  if (deltaTimeMs < 1000) {
    return `${deltaTimeMs}ms`;
  }

  // less than 1min
  if (deltaTimeMs < 1000 * 60) {
    return `${(deltaTimeMs / 1000).toFixed(1)}sec`;
  }

  // less than 1hour
  if (deltaTimeMs < 1000 * 60 * 60) {
    return `${(deltaTimeMs / (1000 * 60)).toFixed(1)}min`;
  }

  // less than 1day
  if (deltaTimeMs < 1000 * 60 * 60 * 24) {
    return `${(deltaTimeMs / (1000 * 60 * 60)).toFixed(1)}h`;
  }

  const totalDays = deltaTimeMs / (1000 * 60 * 60 * 24);
  if (Math.ceil(totalDays) > 1) {
    return `${totalDays.toFixed(1)}days`;
  }
  return `${(totalDays).toFixed(1)}day`;
};

const _tryGetTimeSinceBuild = (): string => {
  try {
    return _getHumanTimeDiff(new Date(buildDate), currDate);
  } catch (err: any) {
    return "<not computed>";
  }
};

const timeSinceBuild = _tryGetTimeSinceBuild();

interface IBuildInfos {
  buildDate: string;
  timeSinceBuild: string;
};

export const buildInfos: IBuildInfos = {
  buildDate,
  timeSinceBuild,
};

