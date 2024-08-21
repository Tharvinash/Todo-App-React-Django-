import { StatusEnum } from '../type/task';

export const formatStatus = (status: StatusEnum): string => {
  switch (status) {
    case StatusEnum.NotStarted:
      return 'Not Started';
    case StatusEnum.InProgress:
      return 'In Progress';
    case StatusEnum.Completed:
      return 'Completed';
    default:
      return 'Not Started';
  }
};


export const reverseFormatStatus = (status: string): StatusEnum => {
  switch (status) {
    case 'Not Started':
      return StatusEnum.NotStarted;
    case 'Completed':
      return StatusEnum.Completed;
    case 'In Progress':
      return StatusEnum.InProgress;
    default:
      return StatusEnum.InProgress;
  }
};
