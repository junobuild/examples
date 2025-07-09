import { defineConfig } from '@junobuild/config';

export default defineConfig({
	satellite: {
		ids: {
			development: '<DEV_SATELLITE_ID>',
			production: '<PROD_SATELLITE_ID>'
		},
		source: 'build',
		predeploy: ['npm run build']
	}
});
