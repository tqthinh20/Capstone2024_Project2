import React, { Component } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Navbar from "./Navbar/Navigation";
import NavbarAdmin from "./Navbar/NavigationAdmin";
import UserHome from "./UserHome";
import StartEnd from "./StartEnd";
import ElectionStatus from "./ElectionStatus";

import getWeb3 from "../getWeb3";
import Election from "../contracts/Election.json";

import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ElectionInstance: undefined,
      account: null,
      web3: null,
      isAdmin: false,
      elStarted: false,
      elEnded: false,
      elDetails: {},
    };
  }

  // refreshing once
  componentDidMount = async () => {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Election.networks[networkId];
      const instance = new web3.eth.Contract(
        Election.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3: web3,
        ElectionInstance: instance,
        account: accounts[0],
      });

      const admin = await this.state.ElectionInstance.methods.getAdmin().call();
      if (this.state.account === admin) {
        this.setState({ isAdmin: true });
      }

      // Get election start and end values
      const start = await this.state.ElectionInstance.methods.getStart().call();
      this.setState({ elStarted: start });
      const end = await this.state.ElectionInstance.methods.getEnd().call();
      this.setState({ elEnded: end });

      // Getting election details from the contract
      const electionDetails = await this.state.ElectionInstance.methods
      .getElectionDetails()
      .call();
      
      this.setState({
        elDetails: {
          adminName: electionDetails.adminName,
          adminEmail: electionDetails.adminEmail,
          electionTitle: electionDetails.electionTitle,
          electionDescription: electionDetails.electionDescription,
        },
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };
  // end election
  endElection = async () => {
    await this.state.ElectionInstance.methods
      .endElection()
      .send({ from: this.state.account, gas: 1000000 });
    window.location.reload();
  };
  // register and start election
  registerElection = async (data) => {
    await this.state.ElectionInstance.methods
      .setElectionDetails(
        data.adminName.toLowerCase(),
        data.adminEmail.toLowerCase(),
        data.electionTitle.toLowerCase(),
        data.electionDescription.toLowerCase()
      )
      .send({ from: this.state.account, gas: 1000000 });
    window.location.reload();
  };

  render() {
    if (!this.state.web3) {
      return (
        <>
          <Navbar />
          <center>Loading Web3, accounts, and contract...</center>
        </>
      );
    }
    return (
      <>
        {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
        <div className="container-main">
          <div className="container-item center-items info">
            Your Account: {this.state.account}
          </div>
          {!this.state.elStarted & !this.state.elEnded ? (
            <div className="container-item info">
              <center>
                <h3>The election has not been initialize.</h3>
                {this.state.isAdmin ? (
                  <p>Set up the election.</p>
                ) : (
                  <p>Please wait..</p>
                )}
              </center>
            </div>
          ) : null}
        </div>
        {this.state.isAdmin ? (
          <>
            <this.renderAdminHome />
          </>
        ) : this.state.elStarted ? (
          <>
            <UserHome el={this.state.elDetails} />
          </>
        ) : !this.state.isElStarted && this.state.isElEnded ? (
          <>
            <div className="container-item attention">
              <center>
                <h3>The Election ended.</h3>
                <br />
                <Link
                  to="/Results"
                  style={{ color: "black", textDecoration: "underline" }}
                >
                  See results
                </Link>
              </center>
            </div>
          </>
        ) : null}
      </>
    );
  }

  renderAdminHome = () => {
    const EMsg = (props) => {
      return <span style={{ color: "tomato" }}>{props.msg}</span>;
    };

    const AdminHome = () => {
      // Contains of Home page for the Admin
      const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        this.registerElection(data);
      };

      return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!this.state.elStarted & !this.state.elEnded ? (
              <div className="container-main">
                <div className="about-admin">
                  <h3>About Admin</h3>
                  <div className="container-item center-items">
                    <form>
                      <div className="div-li">
                        <label className="label-home">
                          Full Name{" "}
                          {errors.adminName && <EMsg msg="*required" />}
                          <input
                            className="input-home"
                            type="text"
                            {...register("adminName", {
                              required: true,
                            })}
                          />
                        </label>
                      </div>
                      <div className="div-li">
                        <label className="label-home">
                          Email{" "}
                          {errors.adminEmail && (
                            <EMsg msg={errors.adminEmail.message} />
                          )}
                          <input
                            className="input-home"
                            name="adminEmail"
                            {...register("adminEmail", {
                              required: "*Required",
                              pattern: {
                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: "*Invalid",
                              },
                            })}
                          />
                        </label>
                      </div>                      
                    </form>
                  </div>
                </div>
                <div className="about-election">
                  <h3>About Election</h3>
                  <div className="container-item center-items">
                    <form>
                      <div className="div-li">
                        <label className="label-home">
                          Election Title{" "}
                          {errors.electionTitle && <EMsg msg="*required" />}
                          <input
                            className="input-home"
                            type="text"
                            {...register("electionTitle", {
                              required: true,
                            })}
                          />
                        </label>
                      </div>
                      <div className="div-li">
                        <label className="label-home">
                          Short Description{" "}
                          {errors.electionDescription && <EMsg msg="*required" />}
                          <input
                            className="input-home"
                            type="text"
                            {...register("electionDescription", {
                              required: true,
                            })}
                          />
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : this.state.elStarted ? (
              <UserHome el={this.state.elDetails} />
            ) : null}
            <StartEnd
              elStarted={this.state.elStarted}
              elEnded={this.state.elEnded}
              endElFn={this.endElection}
            />
            <ElectionStatus
              elStarted={this.state.elStarted}
              elEnded={this.state.elEnded}
            />
          </form>
        </div>
      );
    };
    return <AdminHome />;
  };
}
