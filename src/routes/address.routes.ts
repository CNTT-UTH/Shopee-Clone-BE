import { Router } from 'express';
import { Role } from '~/constants/enums';
import addressController from '~/controllers/address.controller';
import { accessTokenValidator, authorizeRole, platformValidator } from '~/middlewares/auth.middleware';
import { validationMiddleware } from '~/middlewares/validation.middleware';
import { AddressDTO } from '~/models/dtos/AddressDTO';

const router = Router();

// Get address by id
router.route('/get-address/:id').get(addressController.getAddress);

// Get user adddresses
router
    .route('/get-user-addresses')
    .get(platformValidator, accessTokenValidator, authorizeRole([Role.User]), addressController.getUserAddresses);

// Create user address
router
    .route('/create-user-address')
    .post(
        platformValidator,
        accessTokenValidator,
        authorizeRole([Role.User]),
        validationMiddleware(AddressDTO),
        addressController.createUserAdress,
    );

// Get all city
router.route('/get-all-cities').get(addressController.getAllCities);

// Get districts by city code
router.route('/get-all-districts/:city_code').get(addressController.getAllDistricts);

// Get wards by districts code
router.route('/get-all-wards/:district_code').get(addressController.getAllWards);

export default router;
