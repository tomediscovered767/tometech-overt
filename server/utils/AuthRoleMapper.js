/**
  Due to ClearDB query limits (free tier = 3600/hr),
  roles will be stored in the database as a string that represents multiple numerical roles.
  This file is used to map these strings to the numerical roles as if
  the numerical roles were stored in a typical RBAC table.
  This reduces the number of queries required at each login and signup to 1.
 */
