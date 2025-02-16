import { makeInvoker } from 'awilix-express';
import { Router } from 'express';
import { Role } from '~/constants/enums';
import container from '~/container';
import { AddressController } from '~/controllers/address.controller';
import { accessTokenValidator, authorizeRole, platformValidator } from '~/middlewares/auth.middleware';
import { validationMiddleware } from '~/middlewares/validation.middleware';
import { AddressDTO } from '~/models/dtos/AddressDTO';

const router = Router();
const api = makeInvoker<AddressController>(() => container.resolve('addressController'))

// Get address by id
router.route('/get-address/:id').get(api('getAddress'));

// Get user adddresses
router
    .route('/get-user-addresses')
    .get(platformValidator, accessTokenValidator, authorizeRole([Role.User]), api('getUserAddresses'));

// Create user address
router
    .route('/create-user-address')
    .post(
        platformValidator,
        accessTokenValidator,
        authorizeRole([Role.User]),
        validationMiddleware(AddressDTO),
        api('createUserAdress'),
    );

// Get all city
router.route('/get-all-cities').get(api('getAllCities'));

// Get districts by city code
router.route('/get-all-districts/:city_code').get(api('getAllDistricts'));

// Get wards by districts code
router.route('/get-all-wards/:district_code').get(api('getAllWards'));

export default router;
