export default {
  // Common text
  common: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    reset: 'Reset',
    refresh: 'Refresh',
    submit: 'Submit',
    save: 'Save',
    loading: 'Loading...',
    noData: 'No Data',
    operation: 'Operation',
    status: 'Status',
    createTime: 'Create Time',
    updateTime: 'Update Time',
    success: 'Success',
    failed: 'Failed',
    total: 'Total',
    page: 'Page',
    items: 'Items',
    prev: 'Previous',
    next: 'Next'
  },

  // Navigation menu
  menu: {
    home: 'Home',
    about: 'About',
    demo: 'Demo',
    userManage: 'User Management',
    appManage: 'App Management'
  },

  // User related
  user: {
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    email: 'Email',
    avatar: 'Avatar',
    profile: 'Profile',
    role: 'Role',
    account: 'Account',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    loginNow: 'Login Now',
    registerNow: 'Register Now',
    loginSuccess: 'Login successful!',
    registerSuccess: 'Registration successful! Logging you in automatically...',
    logoutSuccess: 'Logout successful',
    loginFailed: 'Login failed, please check your username and password',
    registerFailed: 'Registration failed, please try again later',
    personalCenter: 'Personal Center',
  },

  // Roles
  role: {
    admin: 'Admin',
    user: 'User',
    unknown: 'Unknown'
  },

  // User management page
  userManage: {
    title: 'User Management',
    addUser: 'Add User',
    editUser: 'Edit User',
    deleteUser: 'Delete User',
    userList: 'User List',
    searchByName: 'Enter username',
    searchByAccount: 'Enter account',
    selectRole: 'Select role',
    id: 'ID',
    userName: 'Username',
    userAccount: 'Account',
    userAvatar: 'Avatar',
    userProfile: 'Profile',
    userRole: 'Role',
    confirmDelete: 'Confirm Delete',
    deleteConfirmText: 'Are you sure you want to delete user "{userName}"? This action cannot be undone.',
    addSuccess: 'Added successfully',
    updateSuccess: 'Updated successfully',
    deleteSuccess: 'Deleted successfully',
    operationFailed: 'Operation failed',
    fetchListFailed: 'Failed to fetch user list'
  },

  // Form validation
  validation: {
    required: 'This field is required',
    usernameRequired: 'Please enter username',
    accountRequired: 'Please enter account',
    passwordRequired: 'Please enter password',
    confirmPasswordRequired: 'Please confirm password',
    emailRequired: 'Please enter email address',
    roleRequired: 'Please select role',
    minLength: 'Minimum length is {min} characters',
    accountMinLength: 'Account must be at least 4 characters',
    passwordMinLength: 'Password must be at least 6 characters',
    passwordMatch: 'Passwords do not match',
    emailFormat: 'Please enter a valid email address',
    usernameFormat: 'Username can only contain letters, numbers and underscores',
    usernameLength: 'Username length should be 3-20 characters',
    passwordFormat: 'Password must contain both letters and numbers'
  },

  // Application related
  app: {
    title: 'CodeGenius',
    welcome: 'Welcome back, please login to your account',
    createAccount: 'Create your account to start using our services'
  },

  // Agreement related
  agreement: {
    agree: 'I have read and agree to the',
    userAgreement: 'User Agreement',
    privacyPolicy: 'Privacy Policy',
    and: 'and'
  },

  // Pagination
  pagination: {
    total: '{total} items in total',
    pageSize: 'Items per page',
    jumpTo: 'Go to',
    page: 'page'
  },

  // Demo page
  demo: {
    title: 'Demo Page',
    overview: 'Data Overview',
    dataList: 'Data List',
    totalProjects: 'Total Projects',
    inProgress: 'In Progress',
    completed: 'Completed',
    pending: 'Pending Review',
    projectName: 'Project Name',
    searchPlaceholder: 'Search...',
    searchButton: 'Search',
    view: 'View',
    edit: 'Edit',
    completed_status: 'Completed',
    processing_status: 'In Progress',
    warning_status: 'Pending Review'
  },

  // User Center
  userCenter: {
    title: 'User Center',
    subtitle: 'Manage your personal information and account settings',
    personalInfo: 'Personal Information',
    accountStats: 'Account Statistics',
    joinTime: 'Join Time',
    lastUpdate: 'Last Update',
    updateSuccess: 'Information updated successfully',
    updateFailed: 'Failed to update information',
    accountTip: 'Account cannot be modified once set',
    roleTip: 'Role permissions are set by administrators',
    avatarPlaceholder: 'Please enter avatar image URL',
    profilePlaceholder: 'Please introduce yourself briefly...'
  }
}
