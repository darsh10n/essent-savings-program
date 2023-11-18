interface CreateInterestRequest {
  rate: number;
}

interface Interest {
  rate: number;
  day:number;
}

export const interests: Interest[] = [];

export {
  CreateInterestRequest, Interest,
};
