<template>
  <div class="flex">
    <div class="min-h-screen">
      <div>
        <div>
          <img src="../../static/logo.png" alt="Logo Image">
          <p>ERP System</p>
        </div>
        <a href="/register">Sign Up</a>
      </div>
      <p>Welcome back!!</p>
      <h2>Please Sign In</h2>

      <form method="POST" action="/">
        <div>
          <label for="email">Email address</label>
          <input id="email" type="text" name="email" placeholder="Enter email address">
        </div>

        <div>
          <label for="password">Password</label>
          <input id="password" type="password" name="password" placeholder="Enter your password">
        </div>

        <div>
          <input type="checkbox"> Remember me
          <a href="/recover-password">I forgot my password</a>
        </div>

        <input type="submit" value="Sign In" class="bg-primary">
      </form>
    </div>

    <div class="h-auto">
      <img src="../../static/login.png" alt="Logo Image">
    </div>
  </div>
</template>

<script>
</script>
