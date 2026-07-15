import { Router } from "express";
import { candidates } from "../services/candidateService";

const router = Router();

router.get("/", (req, res) => {
  res.json(candidates);
});

router.get("/:id", (req, res) => {
  const candidate = candidates.find(
    c => c.id === req.params.id
  );

  if (!candidate) {
    return res.status(404).json({
      message: "Candidate not found",
    });
  }

  res.json(candidate);
});

export default router;