
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routes import pedidos, produtos, usuarios


app = FastAPI(
    title="Cupcake Ordering System API",
    description="API do sistema de pedidos de cupcakes - PI II",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://capycakes.onrender.com",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(produtos.router)
app.include_router(usuarios.router)
app.include_router(pedidos.router)


@app.get("/")
def health_check():
    return {
        "status": "ok",
        "message": "Cupcake Ordering System API está funcionando."
    }
