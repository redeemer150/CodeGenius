export default {
  // 通用文本
  common: {
    confirm: '确认',
    cancel: '取消',
    delete: '删除',
    edit: '编辑',
    add: '添加',
    search: '搜索',
    reset: '重置',
    refresh: '刷新',
    submit: '提交',
    save: '保存',
    loading: '加载中...',
    noData: '暂无数据',
    operation: '操作',
    status: '状态',
    createTime: '创建时间',
    updateTime: '更新时间',
    success: '成功',
    failed: '失败',
    total: '总计',
    page: '页',
    items: '条',
    prev: '上一页',
    next: '下一页'
  },

  // 导航菜单
  menu: {
    home: '首页',
    about: '关于',
    demo: '演示页面',
    userManage: '用户管理',
    appManage: '应用管理'
  },

  // 用户相关
  user: {
    login: '登录',
    register: '注册',
    logout: '退出登录',
    username: '用户名',
    password: '密码',
    confirmPassword: '确认密码',
    email: '邮箱',
    avatar: '头像',
    profile: '个人简介',
    role: '角色',
    account: '账号',
    rememberMe: '记住我',
    forgotPassword: '忘记密码？',
    noAccount: '还没有账户？',
    hasAccount: '已有账户？',
    loginNow: '立即登录',
    registerNow: '立即注册',
    loginSuccess: '登录成功！',
    registerSuccess: '注册成功！正在为您自动登录...',
    logoutSuccess: '退出登录成功',
    loginFailed: '登录失败，请检查用户名和密码',
    registerFailed: '注册失败，请稍后重试',
    personalCenter: '个人中心',
  },

  // 角色
  role: {
    admin: '管理员',
    user: '普通用户',
    unknown: '未知'
  },

  // 用户管理页面
  userManage: {
    title: '用户管理',
    addUser: '添加用户',
    editUser: '编辑用户',
    deleteUser: '删除用户',
    userList: '用户列表',
    searchByName: '请输入用户名',
    searchByAccount: '请输入账号',
    selectRole: '请选择角色',
    id: 'ID',
    userName: '用户名',
    userAccount: '账号',
    userAvatar: '头像',
    userProfile: '个人简介',
    userRole: '角色',
    confirmDelete: '确认删除',
    deleteConfirmText: '确定要删除用户 "{userName}" 吗？此操作不可恢复。',
    addSuccess: '添加成功',
    updateSuccess: '更新成功',
    deleteSuccess: '删除成功',
    operationFailed: '操作失败',
    fetchListFailed: '获取用户列表失败'
  },

  // 表单验证
  validation: {
    required: '此字段为必填项',
    usernameRequired: '请输入用户名',
    accountRequired: '请输入账号',
    passwordRequired: '请输入密码',
    confirmPasswordRequired: '请确认密码',
    emailRequired: '请输入邮箱地址',
    roleRequired: '请选择角色',
    minLength: '长度至少{min}位',
    accountMinLength: '账号长度至少4位',
    passwordMinLength: '密码长度至少6位',
    passwordMatch: '两次输入的密码不一致',
    emailFormat: '请输入有效的邮箱地址',
    usernameFormat: '用户名只能包含字母、数字和下划线',
    usernameLength: '用户名长度应为3-20个字符',
    passwordFormat: '密码必须包含字母和数字'
  },

  // 应用相关
  app: {
    title: 'CodeGenius',
    welcome: '欢迎回来，请登录您的账户',
    createAccount: '创建您的账户，开始使用我们的服务'
  },

  // 协议相关
  agreement: {
    agree: '我已阅读并同意',
    userAgreement: '《用户协议》',
    privacyPolicy: '《隐私政策》',
    and: '和'
  },

  // 分页
  pagination: {
    total: '共 {total} 条数据',
    pageSize: '每页条数',
    jumpTo: '跳至',
    page: '页'
  },

  // Demo页面
  demo: {
    title: 'Demo Page',
    overview: '数据概览',
    dataList: '数据列表',
    totalProjects: '总项目数',
    inProgress: '进行中',
    completed: '已完成',
    pending: '待审核',
    projectName: '项目名',
    searchPlaceholder: '搜索...',
    searchButton: '搜索',
    view: '查看',
    edit: '编辑',
    completed_status: '已完成',
    processing_status: '进行中',
    warning_status: '待审核'
  },

  // 用户中心
  userCenter: {
    title: '用户中心',
    subtitle: '管理您的个人信息和账户设置',
    personalInfo: '个人信息',
    accountStats: '账户统计',
    joinTime: '注册时间',
    lastUpdate: '最后更新',
    updateSuccess: '信息更新成功',
    updateFailed: '信息更新失败',
    accountTip: '账号一旦设置不可修改',
    roleTip: '角色权限由管理员设置',
    avatarPlaceholder: '请输入头像图片URL地址',
    profilePlaceholder: '请简单介绍一下自己...'
  }
}
