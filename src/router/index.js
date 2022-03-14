import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import LoginIndex from '../views/login/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginIndex
  },
  {
    path: '/student',
    name: 'student',
    component: () => import('../views/student/index.vue'),
    children: [
      {
        path: 'home',
        name: 'student_home',
        component: () => import('../views/student/home.vue')

      },
      {
        path: 'examnation',
        name: 'student_examnation',
        component: () => import('../views/student/examnation.vue')

      },
      {
        path: 'grade',
        name: 'student_grade',
        component: () => import('../views/student/grade.vue')

      }
    ]

  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/index.vue'),
    children: [
      {
        path:"grade/detail",
        component:()=> import('../views/admin/grade/grade_detail.vue'),
        name:"admin_grade_detail"

      },
      {
        path:"grade",
        component:()=> import('../views/admin/grade/grade.vue'),
        name:"admin_grade"

      },
      {
        path: 'home',
        component: () => import('../views/admin/home.vue'),
        name: 'admin_home'
      },
      {
        path: 'organization',
        component: () => import('../views/admin/organization/organization.vue'),
        name: 'admin_organization',
      },
      {
        path: 'examnation',
        component: () => import('../views/admin/examnation.vue'),
        name: 'admin_examnation'
      },
      {
        path: 'organization/teacher',
        component: () => import('../views/admin/organization/organization_teacher.vue'),
        name: 'admin_organization_teacher'
      },
      {
        path: 'organization/student',
        component: () => import('../views/admin/organization/organization_student.vue'),
        name: 'admin_organization_student'
      },
      {
        path: 'organization/teacher/detail',
        component: () => import('../views/admin/organization/organization_teacher_detail.vue'),
        name: 'admin_organization_teacher_detail'
      },
      {
        path: 'mark/mark',
        component: () => import('../views/admin/mark/mark.vue'),
        name: 'admin_mark'
      },
      {
        path: 'mark/mark_console',
        component: () => import('../views/admin/mark/mark_console.vue'),
        name: 'admin_mark_console'
      },
      {
        path: 'log',
        component: () => import('../views/admin/log.vue'),
        name: 'admin_log'
      }

    ]
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import('../views/teacher/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/teacher/home.vue')
      }

    ]
  }


]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  mode: history
})

export default router
