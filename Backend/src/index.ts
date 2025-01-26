import express, { Request, Response } from 'express';
import { FleetCommandService } from './App/command-services/fleet-command.service';
import { FleetQueriesService } from './App/queries-services/fleet-queries.service';
import { VehicleCommandService } from './App/command-services/vehicle-command.service';

const app = express();
const port = 3000;

app.use(express.json());

const fleetCommandService = new FleetCommandService();
const vehicleCommandService = new VehicleCommandService();
const fleetQueriesService = new FleetQueriesService();

app.post('/fleet', async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const fleetId = await fleetCommandService.create(userId);
    res.status(201).send({ fleetId });
  } catch (error : any) {
    res.status(400).send({ error: error.message });
  }
});

app.post('/fleet/:fleetID/vehicle', async (req: Request, res: Response) => {
  const { fleetID } = req.params;
  const { plateNumber } = req.body;
  try {
    const vehicle = await vehicleCommandService.registerVehicle(fleetID, plateNumber);
    res.status(201).send(vehicle);
  } catch (error : any) {
    res.status(400).send({ error: error.message });
  }
});

app.post('/fleet/:fleetID/vehicle/:plateNumber/park', async (req: Request, res: Response) => {
  const { fleetID, plateNumber } = req.params;
  const { location } = req.body;
  try {
    const vehicle = await vehicleCommandService.parkVehicle(fleetID, plateNumber, location);
    res.status(200).send(vehicle);
  } catch (error : any) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/fleet/:fleetID/vehicle/:plateNumber/location', async (req: Request, res: Response) => {
  const { fleetID, plateNumber } = req.params;
  try {
    const location = await fleetQueriesService.localizeVehicle(fleetID, plateNumber);
    res.status(200).send(location);
  } catch (error : any) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/fleet/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const fleetId = await fleetQueriesService.getFleetIdByUserId(userId);
    res.status(200).send({ fleetId });
  } catch (error : any) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
