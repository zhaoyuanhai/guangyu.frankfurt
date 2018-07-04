/*
 * GET users listing.
 */
import express = require('express');
const router = express.Router();

router.get('/user', (req: express.Request, res: express.Response) => {
    res.send("respond with a resource");
});

export default router;