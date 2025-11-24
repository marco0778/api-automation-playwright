// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir:'./tests',
  timeout:15 * 1000,
  expect:{
    timeout: 60000,
  },
  reporter: 'html',

  use: {
    baseURL: "https://restful-booker.herokuapp.com",
    browserName:'chromium',
    headless: true,
  },

});