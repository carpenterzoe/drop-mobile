import { gql } from '@apollo/client';

export const GET_CAN_SUBSCRIBE_COURSES = gql`
query getCanSubscribeCourses {
  getCanSubscribeCourses {
    data {
      id
      logo
      name
      courses {
        id
        name
      }
    }
  }
}
`;

export const GET_SCHEDULES_BY_COURSE = gql`
query getSchedulesByCourse($courseId: String!){
  getSchedulesByCourse(courseId: $courseId){
    code
    message
    data {
      id
      schoolDay
      startTime
      endTime
    }
    page {
      total
    }
  }
}`;

export const SUBSCRIBE_COURSE = gql`
mutation subscribeCourse($scheduleId: String!, $cardId: String!) {
  subscribeCourse(scheduleId: $scheduleId, cardId: $cardId) {
    code
    message
  }
}`;

export const GET_SCHEDULE_RECORD = gql`
query getScheduleRecords($page: PageInput!) {
  getScheduleRecords(page: $page) {
    code
    data {
      id
      schedule {
        schoolDay
        startTime
        endTime
      }
      status
      course {
        name
      }
      org {
        name
        id
        logo
      }
    }
    message
  }
}`;

export const CANCEL_SUBSCRIBE = gql`
  mutation cancelSubscribeCourse($scheduleRecordId: String!) {
    cancelSubscribeCourse(scheduleRecordId: $scheduleRecordId) {
      code
      message
    }
  }
`;
