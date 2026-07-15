import express from "express";
import cors from "cors";
import candidateRoutes from "./routes/candidateRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/candidates", candidateRoutes);

app.get("/", (_req, res) => {
  res.json({
    message: "Zyra Backend Working 🚀",
  });
});

export default app;