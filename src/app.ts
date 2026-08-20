import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config/config";
import apiV1Routes from "./api/v1/routers/routes.index";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";

/**
 * Builds the Express application: middleware, routes, then the error handlers.
 * Kept free of side effects (no DB connect, no listen) so it can be imported
 * and exercised on its own.
 */
export const createApp = (): Application => {
	const app = express();

	const corsOptions: cors.CorsOptions = {
		allowedHeaders: ["sessionId", "Content-Type"],
		exposedHeaders: ["sessionId"],
		origin: config.server.corsOrigins,
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		preflightContinue: false
	};

	app.use(cors(corsOptions));
	app.use(express.json());

	app.get("/", (_req: Request, res: Response) => {
		res.send("<h1>air bnb server running succesfully</h1>");
	});

	app.get("/health", (_req: Request, res: Response) => {
		res.status(200).json({ status: "ok", env: config.env, uptime: process.uptime() });
	});

	app.use("/api/v1", apiV1Routes);

	// Must stay last: anything unmatched 404s, and everything thrown above
	// lands in the single error handler.
	app.use(notFoundHandler);
	app.use(errorHandler);

	return app;
};

export default createApp;
