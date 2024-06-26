import { TITLE_CONSTANTS } from '@/constants/titleConstants';

const routeTitles = [
  //* DASHBOARD
  { pattern: /^\/dashboard$/, title: TITLE_CONSTANTS.DASHBOARD },

  //* PROFILE
  { pattern: /^\/profile$/, title: TITLE_CONSTANTS.PROFILE },

  //* USER
  { pattern: /^\/user$/, title: TITLE_CONSTANTS.USER },
  {
    pattern: /^\/user\/(\d+)$/,
    title: id => `${TITLE_CONSTANTS.USER} | ${id}`
  },
  {
    pattern: /^\/user\/create$/,
    title: `${TITLE_CONSTANTS.USER} | Create`
  },
  {
    pattern: /^\/user\/edit\/(\d+)$/,
    title: id => `${TITLE_CONSTANTS.USER} | Edit | ${id}`
  },

  //* VEHICLE
  { pattern: /^\/$/, title: TITLE_CONSTANTS.VEHICLE },

  {
    pattern: /^\/vehicle\/create$/,
    title: `${TITLE_CONSTANTS.VEHICLE} | Create`
  },
  {
    pattern: /^\/vehicle\/edit\/(\d+)$/,
    title: id => `${TITLE_CONSTANTS.VEHICLE} | Edit | ${id}`
  },
  {
    pattern: /^\/vehicle\/(\d+)$/,
    title: id => `${TITLE_CONSTANTS.VEHICLE}  | ${id}`
  },
  //* ORDERS
  { pattern: /^\/list-orders$/, title: id => TITLE_CONSTANTS.ORDERS },
  { pattern: /.*/, title: TITLE_CONSTANTS.NOTFOUND },
];

export default routeTitles;
