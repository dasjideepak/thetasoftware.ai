import type { FilterSection } from '../types/filter';

export const filterSections: FilterSection[] = [
  {
    title: 'Application Type',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Archived', value: 'archived' },
    ],
  },
  {
    title: 'Jobs',
    options: [
      {
        label: 'Digital Marketing Specialist (O26)',
        value: 'job-123',
      },
      { label: 'Senior Product Designer', value: 'job-456' },
      { label: 'Frontend Engineer (React)', value: 'job-789' },
      { label: 'Senior Data Scientist', value: 'job-234' },
      { label: 'UX Researcher', value: 'job-567' },
      { label: 'Senior Backend Engineer', value: 'job-890' },
      { label: 'Director of Marketing', value: 'job-345' },
      { label: 'Senior DevOps Engineer', value: 'job-678' },
    ],
  },
  {
    title: 'CRM',
    options: [
      { label: 'All Contacts' },
      { label: 'My Contacts' },
      { label: 'Unassigned' },
    ],
  },
  {
    title: 'Profile Details',
    options: [
      { label: 'Has Availability' },
      { label: 'Has Interviews' },
      { label: 'No Availability' },
    ],
  },
  {
    title: 'Source',
    options: [
      { label: 'LinkedIn', value: 'LinkedIn' },
      { label: 'Referral', value: 'Referral' },
      { label: 'Career Page', value: 'Career Page' },
      { label: 'Indeed', value: 'Indeed' },
      { label: 'Dribbble', value: 'Dribbble' },
      { label: 'GitHub', value: 'GitHub' },
      { label: 'Kaggle', value: 'Kaggle' },
      { label: 'Stack Overflow', value: 'Stack Overflow' },
      { label: 'Medium', value: 'Medium' },
      { label: 'ArXiv', value: 'ArXiv' },
      { label: 'Apple Developer', value: 'Apple Developer' },
      { label: 'HackerOne', value: 'HackerOne' },
    ],
  },
  {
    title: 'Responsibility',
    options: [{ label: 'Assigned to Me' }, { label: 'Unassigned' }],
  },
  {
    title: 'Pipeline Tasks',
    options: [
      { label: 'Pending Tasks' },
      { label: 'Completed Tasks' },
      { label: 'Overdue Tasks' },
    ],
  },
  {
    title: 'Education',
    options: [
      { label: "Bachelor's Degree" },
      { label: "Master's Degree" },
      { label: 'PhD' },
    ],
  },
];
