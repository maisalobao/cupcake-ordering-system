from datetime import datetime, timedelta, timezone
import os

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from src.config.database import get_db
from src.models.usuario import Usuario


JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 60

bearer_scheme = HTTPBearer()


def criar_token_acesso(usuario: Usuario):
    if not JWT_SECRET_KEY:
        raise RuntimeError("JWT_SECRET_KEY não configurada.")

    expiracao = datetime.now(timezone.utc) + timedelta(
        minutes=JWT_EXPIRE_MINUTES
    )

    payload = {
        "sub": str(usuario.id_usuario),
        "exp": expiracao
    }

    return jwt.encode(
        payload,
        JWT_SECRET_KEY,
        algorithm=JWT_ALGORITHM
    )


def obter_admin_atual(
    credenciais: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db)
):
    if not JWT_SECRET_KEY:
        raise RuntimeError("JWT_SECRET_KEY não configurada.")

    token = credenciais.credentials

    try:
        payload = jwt.decode(
            token,
            JWT_SECRET_KEY,
            algorithms=[JWT_ALGORITHM]
        )

        id_usuario = int(payload.get("sub"))

    except (JWTError, ValueError, TypeError):
        raise HTTPException(
            status_code=401,
            detail="Token inválido ou expirado."
        )

    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == id_usuario
    ).first()

    if not usuario or usuario.tipo != "ADMINISTRADOR":
        raise HTTPException(
            status_code=403,
            detail="Acesso permitido apenas para administradores."
        )

    return usuario