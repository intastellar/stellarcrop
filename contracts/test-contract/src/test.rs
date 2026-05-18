extern crate std;

use super::*;
use soroban_sdk::{symbol_short, Env};

#[test]
fn ping_returns_pong() {
    let env = Env::default();
    let contract_id = env.register(TestContract, ());
    let client = TestContractClient::new(&env, &contract_id);

    assert_eq!(client.ping(), symbol_short!("pong"));
}
