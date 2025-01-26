import { Command } from 'commander';
import axios from 'axios';

const program = new Command();
const baseURL = 'http://localhost:3000';

program
  .command('create-fleet <userId>')
  .description('Create a new fleet for a user')
  .action(async (userId: string) => {
    try {
      const response = await axios.post(`${baseURL}/fleet`, { userId });
      console.log(`Fleet created with ID: ${response.data.fleetId}`);
    } catch (error : any) {
      console.error(`Error: ${error.response?.data?.error || error.message}`);
    }
  });

program
  .command('register-vehicle <fleetID> <plateNumber>')
  .description('Register a new vehicle in a fleet')
  .action(async (fleetID: string, plateNumber: string) => {
    try {
      const response = await axios.post(`${baseURL}/fleet/${fleetID}/vehicle`, { plateNumber });
      console.log(`Vehicle registered: ${response.data.plateNumber}`);
    } catch (error : any) {
      console.error(`Error: ${error.response?.data?.error || error.message}`);
    }
  });

program
  .command('park-vehicle <fleetID> <plateNumber> <latitude> <longitude>')
  .description('Park a vehicle at a specific location')
  .action(async (fleetID: string, plateNumber: string, latitude: string, longitude: string) => {
    try {
      const location = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
      const response = await axios.post(`${baseURL}/fleet/${fleetID}/vehicle/${plateNumber}/park`, { location });
      console.log(`Vehicle parked at: ${location.latitude}, ${location.longitude}`);
    } catch (error : any) {
      console.error(`Error: ${error.response?.data?.error || error.message}`);
    }
  });

program
  .command('localize-vehicle <fleetID> <plateNumber>')
  .description('Get the location of a vehicle')
  .action(async (fleetID: string, plateNumber: string) => {
    try {
      const response = await axios.get(`${baseURL}/fleet/${fleetID}/vehicle/${plateNumber}/location`);
      const location = response.data;
      console.log(`Vehicle located at: ${location.latitude}, ${location.longitude}`);
    } catch (error : any) {
      console.error(`Error: ${error.response?.data?.error || error.message}`);
    }
  });

program.parse(process.argv);
