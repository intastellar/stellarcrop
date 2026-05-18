#![no_std]

use soroban_sdk::{contract, contractimpl, symbol_short, Env, Symbol};

#[contract]
pub struct TestContract;

#[contractimpl]
impl TestContract {
    pub fn ping(_env: Env) -> Symbol {
        symbol_short!("pong")
    }
}

#[cfg(test)]
mod test;
