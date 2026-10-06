from fastapi import FastAPI

from src.routes import pedidos, produtos, usuarios


app = FastAPI(
    title="Cupcake Ordering System API",
    description="API do sistema de pedidos de cupcakes - PI II",
    version="1.0.0"
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
