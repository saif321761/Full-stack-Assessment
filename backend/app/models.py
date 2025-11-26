from sqlalchemy import Index

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), index=True)
    category = Column(String(100), index=True)
    price = Column(Float)
    stock = Column(Integer)

    __table_args__ = (
        Index("idx_product_name", "name"),
        Index("idx_product_category", "category"),
    )
