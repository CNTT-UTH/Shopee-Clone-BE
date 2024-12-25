import app from "./app";
import { envConfig } from "./constants/env";

const PORT = envConfig.PORT || 3004;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
