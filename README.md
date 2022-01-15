# POC

## NestJS: Optimistic Locking

### Tranzakcje
Dekorator `@Transactional()` - Powinien zachowywać się jak aspekt tranzakcjonalności z Springa
(https://www.baeldung.com/transaction-configuration-with-jpa-and-spring)

Co zalecają twórcy: https://docs.nestjs.com/techniques/database#transactions-1

```text
There are many different strategies to handle TypeORM transactions.
We recommend using the QueryRunner class because it gives full control over the transaction.
```

```typescript
class Service {
  async createMany(users: User[]) {
    await this.connection.transaction(async manager => {
      await manager.save(users[0]);
      await manager.save(users[1]);
    });
  }
}
```

```text
Using decorators to control the transaction (`@Transaction()` and @TransactionManager()) is not recommended.
```

Słabo, trzeba wszędzie przekazywać `manager`'a.

Brak kontroli nad tranzakcją = każde zapytanie idzie w oddzielnej tranzakcji.


Realizacja odbywa się poprzez mechanizm 



### Optimistic Locking (OL) - Wersja encji jest podbijana i po aktualizacji następuje sprawdzenie czy zgadza się z wcześniej obliczoną wersją (+1)
