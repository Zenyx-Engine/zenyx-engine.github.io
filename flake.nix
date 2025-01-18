{
  description = "a command line OpenTDB interface";

  inputs = {
    nixpkgs.url = github:nixos/nixpkgs/nixpkgs-unstable;
    utils.url = "github:gytis-ivaskevicius/flake-utils-plus";
    nix-deno.url = "github:brecert/nix-deno";
  };

  outputs = inputs@{ self, nixpkgs, utils, nix-deno }:
    utils.lib.mkFlake {
      inherit self inputs;

      sharedOverlays = [ nix-deno.overlay ];

      outputsBuilder = channels:
        let
          pkgs = channels.nixpkgs;
          trivia =
            let name = "trivia"; in
            pkgs.mkDenoDrv {
              inherit name;
              src = builtins.path {
                inherit name;
                path = ./.;
              };
              lockfile = ./bin/lockfile.json;
              entrypoint = "./bin/trivia.ts";
              denoFlags = [ "--allow-net" ];
            };
        in
        {
          packages.trivia = trivia;
          apps.trivia = trivia;
          defaultPackage = trivia;
          defaultApp = trivia;

          devShell = pkgs.mkShell {
            buildInputs = [ pkgs.deno ];
          };
        };
    };
}
